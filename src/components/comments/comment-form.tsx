// components/comments/comment-form.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

interface CommentFormProps {
  postId: string;
  isLoggedIn: boolean;
  onLogin: () => void;
}

export function CommentForm({ postId, isLoggedIn, onLogin }: CommentFormProps) {
  const [comment, setComment] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      onLogin();
      return;
    }

    // TODO: 실제 API 호출로 대체
    try {
      // await submitComment({ postId, content: comment });
      setComment("");
      router.refresh(); // 댓글 목록 새로고침
    } catch (error) {
      console.error("댓글 작성 실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder={
          isLoggedIn
            ? "댓글을 작성해주세요..."
            : "댓글을 작성하려면 로그인이 필요합니다"
        }
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={!isLoggedIn}
        className="min-h-[100px]"
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={!comment.trim() || !isLoggedIn}>
          {isLoggedIn ? "댓글 작성" : "로그인하고 댓글 작성"}
        </Button>
      </div>
    </form>
  );
}
