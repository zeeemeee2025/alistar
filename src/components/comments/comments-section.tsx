// components/comments/comments-section.tsx
"use client";

import { CommentForm } from "./comment-form";
import { CommentItem } from "./comment-item";

interface CommentsSectionProps {
  postId: string;
  isLoggedIn: boolean;
  onLogin: () => void;
  comments: Array<{
    id: string;
    content: string;
    author: {
      name: string;
      image?: string;
    };
    createdAt: Date;
  }>;
}

export function CommentsSection({
  postId,
  isLoggedIn,
  onLogin,
  comments,
}: CommentsSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">댓글 {comments.length}개</h2>

      <CommentForm postId={postId} isLoggedIn={isLoggedIn} onLogin={onLogin} />

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
