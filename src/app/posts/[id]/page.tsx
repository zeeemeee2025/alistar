"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthModal } from "@/components/auth-modal";

export default function HomePage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const openLoginModal = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setAuthMode("signup");
    setIsAuthModalOpen(true);
  };

  const handleNewPost = () => {
    // If user is not logged in, show login modal
    openLoginModal();
    // TODO: Redirect to new post page when authenticated
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">DevBlog</h1>
          <nav className="flex items-center gap-3">
            <Button
              variant="default"
              onClick={handleNewPost}
              className="flex items-center gap-2"
            >
              <PenLine className="w-4 h-4" />새 글 작성
            </Button>
            <Button variant="ghost" onClick={openLoginModal}>
              로그인
            </Button>
            <Button variant="default" onClick={openSignupModal}>
              회원가입
            </Button>
          </nav>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((post) => (
                <Card key={post}>
                  <CardHeader>
                    <CardTitle>블로그 포스트 제목 {post}</CardTitle>
                    <CardDescription>작성자: 개발자{post}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      이 블로그 포스트는 흥미로운 개발 주제에 대해 다룹니다...
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">읽기</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}
