import { useState } from "react";
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
};

export function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
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
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input id="email" placeholder="이메일" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input id="password" type="password" placeholder="비밀번호" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full">
              {mode === "login" ? "로그인" : "가입하기"}
            </Button>
            <Button variant="outline" className="w-full">
              <Github className="mr-2 h-4 w-4" />
              GitHub로 {mode === "login" ? "로그인" : "가입"}
            </Button>
            <Button
              variant="outline"
              className="w-full bg-yellow-400 hover:bg-yellow-500"
            >
              카카오로 {mode === "login" ? "로그인" : "가입"}
            </Button>
            <Button variant="link" onClick={toggleMode}>
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
