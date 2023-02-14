//파일명에 대괄호 []를 넣어주면 다이나믹 라우팅 가능

import { useRouter } from "next/router";
import Seo from "/components/Seo";

export default function Detail() {
  const router = useRouter();
  const [title, id, poster] = router.query.params || [];
  
  console.log("router: ", router.query.params) // 테스트
  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
    </div>
  );
}
