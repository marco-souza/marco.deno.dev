import type { PropsWithChildren } from "hono/jsx";

type Props = PropsWithChildren<{
  code?: number;
  title?: string;
  description?: string;
}>;

export default function ErrorPage(props: Props) {
  return (
    <div class="my-[15vh] items-center flex flex-col gap-4">
      <div class="items-center justify-center flex flex-col gap-4">
        <h1 class="text-9xl font-extrabold text-gray-700 dark:text-gray-100">
          {props.code ?? 404}
        </h1>
        <h2 class="bg-pink-500 px-2 text-sm rounded rotate-12 absolute text-gray-700">
          {props.title ?? "Page Not Found"}
        </h2>
      </div>
      <p class="text-sm text-gray-400">{props.description}</p>
      {props.children}
    </div>
  );
}
