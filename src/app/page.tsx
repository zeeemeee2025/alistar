// app/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenLine, UserCircle } from "lucide-react";
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
  // 인증 모달 상태 관리
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  // 사용자 인증 상태 관리 (실제로는 전역 상태 관리나 서버 상태와 연동 필요)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<null | { name: string; email: string }>(
    null
  );

  const openLoginModal = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setAuthMode("signup");
    setIsAuthModalOpen(true);
  };

  // 로그인 성공 시 호출될 함수
  const handleLoginSuccess = (userData: { name: string; email: string }) => {
    setIsLoggedIn(true);
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleNewPost = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    // TODO: 새 글 작성 페이지로 이동
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-gray-900">
            DevBlog
          </Link>
          <nav className="flex items-center gap-3">
            <Button
              variant="default"
              onClick={handleNewPost}
              className="flex items-center gap-2"
            >
              <PenLine className="w-4 h-4" />새 글 작성
            </Button>

            {isLoggedIn && user ? (
              // 로그인 상태일 때의 네비게이션
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <UserCircle className="w-4 h-4" />
                    {user.name}님의 대시보드
                  </Button>
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  로그아웃
                </Button>
              </>
            ) : (
              // 비로그인 상태일 때의 네비게이션
              <>
                <Button variant="ghost" onClick={openLoginModal}>
                  로그인
                </Button>
                <Button variant="default" onClick={openSignupModal}>
                  회원가입
                </Button>
              </>
            )}
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
                    <Link href={`/posts/${post}`}>
                      <Button variant="outline">읽기</Button>
                    </Link>
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
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
