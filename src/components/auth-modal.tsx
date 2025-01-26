"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// 인터페이스 정의를 확장하여 필요한 props를 명시합니다
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: "login" | "signup";
  onLoginSuccess: (userData: { name: string; email: string }) => void;
}

// 폼 데이터의 타입을 정의합니다
interface FormData {
  email: string;
  password: string;
  name?: string; // 회원가입 시에만 필요
}

export function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
  onLoginSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  // 입력값 변경을 처리하는 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 사용자가 입력을 시작하면 해당 필드의 에러를 제거합니다
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // 폼 유효성 검사 함수
  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다";
    }

    if (mode === "signup" && !formData.name) {
      newErrors.name = "이름을 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 폼 제출 처리 함수
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // 실제 구현 시에는 이 부분을 API 호출로 대체합니다
      if (mode === "login") {
        // 로그인 로직
        const userData = {
          name: "테스트 사용자", // API 응답에서 받아올 값
          email: formData.email,
        };
        onLoginSuccess(userData);
      } else {
        // 회원가입 로직
        // 회원가입 성공 후 자동 로그인
        const userData = {
          name: formData.name || "신규 사용자",
          email: formData.email,
        };
        onLoginSuccess(userData);
      }
      onClose();
    } catch (error) {
      console.error("인증 에러:", error);
      setErrors({
        email: "인증에 실패했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setErrors({}); // 모드 전환 시 에러 초기화
    setFormData({ email: "", password: "", name: "" }); // 폼 데이터 초기화
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <Card>
          <CardHeader>
            <CardTitle>{mode === "login" ? "로그인" : "회원가입"}</CardTitle>
            <CardDescription>
              {mode === "login"
                ? "DevBlog에 로그인하세요."
                : "DevBlog에 오신 것을 환영합니다."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                {mode === "signup" && (
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="name"
                      name="name"
                      placeholder="이름"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    {errors.name && (
                      <span className="text-sm text-red-500">
                        {errors.name}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="이메일"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">{errors.email}</span>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {errors.password && (
                    <span className="text-sm text-red-500">
                      {errors.password}
                    </span>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading
                ? "처리 중..."
                : mode === "login"
                ? "로그인"
                : "가입하기"}
            </Button>
            <Button variant="outline" className="w-full" disabled={isLoading}>
              <Github className="mr-2 h-4 w-4" />
              GitHub로 {mode === "login" ? "로그인" : "가입"}
            </Button>
            <Button
              variant="outline"
              className="w-full bg-yellow-400 hover:bg-yellow-500"
              disabled={isLoading}
            >
              카카오로 {mode === "login" ? "로그인" : "가입"}
            </Button>
            <Button variant="link" onClick={toggleMode} disabled={isLoading}>
              {mode === "login"
                ? "계정이 없으신가요? 회원가입"
                : "이미 계정이 있으신가요? 로그인"}
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
