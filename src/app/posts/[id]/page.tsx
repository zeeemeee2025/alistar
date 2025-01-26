// app/posts/[id]/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CommentsSection } from "@/components/comments/comments-section";
import { AuthModal } from "@/components/auth-modal";

export default function PostPage({ params }: { params: { id: string } }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: 실제 인증 상태로 대체

  // 예시 댓글 데이터
  const comments = [
    {
      id: "1",
      content: "정말 유익한 글이네요!",
      author: {
        name: "김개발",
      },
      createdAt: new Date(2024, 0, 15),
    },
    {
      id: "2",
      content: "이 부분에 대해 더 자세히 설명해주실 수 있나요?",
      author: {
        name: "이코딩",
      },
      createdAt: new Date(2024, 0, 16),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="mb-4">
            <Link href="/">
              <Button variant="ghost">← 목록으로</Button>
            </Link>
          </div>

          <article className="prose max-w-none mb-12">
            <h1 className="text-3xl font-bold mb-4">
              블로그 포스트 제목 {params.id}
            </h1>
            <div className="text-gray-600 mb-6">작성자: 개발자{params.id}</div>
            <p>게시물 내용...</p>
          </article>

          <div className="border-t pt-8">
            <CommentsSection
              postId={params.id}
              isLoggedIn={isLoggedIn}
              onLogin={() => setIsAuthModalOpen(true)}
              comments={comments}
            />
          </div>
        </div>
      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="login"
      />
    </div>
  );
}
