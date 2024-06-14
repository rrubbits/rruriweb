This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# osumituki


# osumituki
git push heroku main


npx supabase gen types typescript --project-id fkqlrkbkiejnfrnbpcds > ./lib/database.types.ts


# TODO
1. [Schedule] Post編集、削除 
2. [Schedule] Calendar
3. [Schedule] 予約状態　Reservation (Post.reservations, Profile.reservations)
4. ~~[Home] QRコードのリンク追加~~
5. ~~[Schedule] /schedule/post/[uuid] 実装~~
6. [Schedule] 配信LINK、（スキーマLink: createdAt, url. LinkDomain: createdAt, url, type - undetermined, livehouse, broadcast ）
7. [Admin] SUBMIT後LOADING UI, Validation
8. [Schedule] Post更新機能　revisedBy_id
9. [Schedule] Pagination - 過去のポストは前月だけ表示して、その前のリストはクリックしてModalで表示する。
0. ユーザープロフィール



# NOTES
0.07 デプロイ先を「heroku」から「Cloudflare Pages」に変えました。
0.08 デプロイ先を「Vercel」に変えました。
「heroku」
　サーバーがAmerica/Eastにあって遅い。
「Cloudflare Pages」
  応答速度が速かった。
  NextjsのruntimeでNode.jsが使えなくruntimeをedgeに設定する必要がある。
  edgeだとSSGが使えない限界がある。またherokuに戻るか、反応速度が早くSSGが使えるサーバーを探すべき。
「Vercel」
  runtimeでnode.jsが使える。
  SettingsのFunctionsでFunction RegionをTokyoに変えることができた。

SSGとキャッシュのrevalidation
revalidate: DBをアップデートする度に、日付が変わるたびに。


# DOCS
* React.js
* Next.js 14
  https://nextjs.org/docs
  実践Next.js —— App Routerで進化するWebアプリ開発 (エンジニア選書) 
  - Dynamic Routes
  - Cache
  - SSG/ISR
  https://medium.com/rigby-software-house/optimizing-next-js-data-refetch-a-guide-to-revalidation-with-medusa-js-2906d8ae2c8f
* Supabase
* Supabase Auth
  https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app
  https://supabase.com/docs/guides/auth/managing-user-data
