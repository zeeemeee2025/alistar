// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle, Mail, Lock, Pencil, Trash } from "lucide-react";

export default function DashboardPage() {
  // 예시 사용자 데이터
  const [user, setUser] = useState({
    name: "김개발",
    email: "dev@example.com",
    joinDate: "2024-01-01",
  });

  // 예시 게시물 데이터
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Next.js 14로 블로그 만들기",
      publishDate: "2024-01-15",
      status: "published",
      views: 156,
    },
    {
      id: 2,
      title: "TypeScript 타입 시스템 이해하기",
      publishDate: "2024-01-20",
      status: "draft",
      views: 0,
    },
  ]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 프로필 업데이트 API 호출
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 비밀번호 변경 API 호출
  };

  const handleDeletePost = async (postId: number) => {
    if (!confirm("정말 이 게시물을 삭제하시겠습니까?")) return;
    // TODO: 게시물 삭제 API 호출
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {user.name}님의 대시보드
        </h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">계정 관리</TabsTrigger>
            <TabsTrigger value="posts">내 게시물</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>프로필 정보</CardTitle>
                <CardDescription>
                  개인 정보를 확인하고 수정할 수 있습니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input
                      id="name"
                      type="text"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      disabled
                    />
                    <p className="text-sm text-gray-500">
                      이메일은 변경할 수 없습니다.
                    </p>
                  </div>
                  <Button type="submit">프로필 업데이트</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>비밀번호 변경</CardTitle>
                <CardDescription>
                  주기적인 비밀번호 변경을 권장합니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">현재 비밀번호</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">새 비밀번호</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button type="submit">비밀번호 변경</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <CardTitle>내 게시물 관리</CardTitle>
                <CardDescription>
                  작성한 게시물을 관리할 수 있습니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium">{post.title}</h3>
                        <div className="text-sm text-gray-500 space-x-4">
                          <span>작성일: {post.publishDate}</span>
                          <span>조회수: {post.views}</span>
                          <span
                            className={`${
                              post.status === "published"
                                ? "text-green-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {post.status === "published"
                              ? "발행됨"
                              : "임시저장"}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/posts/${post.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
