// components/comments/comment-item.tsx
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface CommentItemProps {
  comment: {
    id: string;
    content: string;
    author: {
      name: string;
      image?: string;
    };
    createdAt: Date;
  };
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="py-4 border-b last:border-b-0">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{comment.author.name}</span>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(comment.createdAt, {
                addSuffix: true,
                locale: ko,
              })}
            </span>
          </div>
          <p className="mt-2 text-gray-700">{comment.content}</p>
        </div>
      </div>
    </div>
  );
}
