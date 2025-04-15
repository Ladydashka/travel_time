function getHourWord(number: number) : string{
    if(number === 1){
        return 'час'
    }else if ([2,3,4].includes(number)){
        return 'часа'
    } else return 'часов'
}

export default getHourWord;