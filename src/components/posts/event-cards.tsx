"use client";

import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import Image from "next/image";

interface CardProps {
  category: string;
  description: string;
  image: string;
  createdAt: Date;
  author: string;
}

const EventCard: React.FC<CardProps> = ({
  category,
  description,
  image,
  createdAt,
  author,
}) => {
  return (
    <Card className="flex h-full max-w-[30rem] flex-col justify-between duration-300 hover:scale-105">
      <CardHeader className="space-y-4">
        <div className="flex w-full items-center justify-between">
          <span className="flex flex-col items-center gap-2 text-sm md:flex-row">
            {author}
          </span>
          <Badge variant={"destructive"}>{category.replaceAll("_", " ")}</Badge>
        </div>
        <Image
          src={image}
          alt={category}
          width={500}
          height={200}
          className="h-2/3 w-full rounded-lg"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <span className="text-xl">{description}</span>
      </CardContent>

      <CardFooter>
        <div className="flex w-full flex-col gap-y-4">
          <div className="flex w-full justify-between text-xs text-slate-400">
            <div className="flex flex-col items-center justify-center">
              <span className="text-center font-bold">Posted at</span>
              <span>
                {createdAt.getDate() < 10
                  ? "0" + createdAt.getDate()
                  : createdAt.getDate()}
                -
                {createdAt.getMonth() + 1 < 10
                  ? "0" + (createdAt.getMonth() + 1)
                  : createdAt.getMonth() + 1}
                -{createdAt.getFullYear()}
              </span>
              <span>
                {createdAt.getHours() < 10
                  ? "0" + createdAt.getHours()
                  : createdAt.getHours()}
                :
                {createdAt.getMinutes() < 10
                  ? "0" + createdAt.getMinutes()
                  : createdAt.getMinutes() < 10
                    ? "0" + createdAt.getMinutes()
                    : createdAt.getMinutes()}
              </span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
