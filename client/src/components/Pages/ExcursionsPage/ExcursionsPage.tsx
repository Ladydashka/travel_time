import NavBar from '../../NavBar/NavBar.tsx';
import { Empty, Layout, Pagination, Space } from 'antd';
import style from './styles.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../redux/store/store.tsx';
import { getAllExcursion } from '../../../redux/excursion/excursionThunk.ts';
import ExcursionItem from '../../ExcursionItem/ExcursionItem.tsx';
import Footer from '../../Footer/Footer.tsx';

function ExcursionPage() {
    const dispatch = useAppDispatch();
    const excursions  = useSelector(
        (store: RootState) => store.excursions.excursions,
    );


    useEffect(() => {
        dispatch(getAllExcursion());
    }, [dispatch]);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentExcursions = excursions.slice(startIndex, endIndex);


    return <>
        <Layout className={style.layout}>
            <NavBar />
            <Space>
                {excursions && excursions.length > 0 ? (
                        <ExcursionItem currentExcursions={currentExcursions} />
                    ) :
                    <Empty description='Нет доступных экскурсий' />
                }
            </Space>
            <Space className={style.pagination}>
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={excursions.length}
                    onChange={e => setCurrentPage(e)}
                    showSizeChanger={false}
                />
            </Space>
            <Footer/>
        </Layout>
    </>;

}

export default ExcursionPage;