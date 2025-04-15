 export type CommentFormData = {
	text: string;
};

export type FullCommentData = CommentFormData & {
	rating: number;
	guide_id: number;
	tour_id: number;
	user_id: number;
};
