import Seo from "../components/Seo";
import Link from "next/link";
import { useRouter } from "next/router";

//Home에 전달되는 파라미터는 서버단에서 가져온 API 정보
export default function Home({ results }) {
    //테스트용
    console.log("wow", results);

  /**nextjs의 링크 넘겨주는 방법 1. useRouter (라우터 훅) + onClick이벤트
   * 클라이언트 사이드로 렌더링 수행
   */
  const router = useRouter();
  //영화 포스터 클릭 시 이벤트
  const onClick = (id, title, poster) => {
    router.push(`/movies/${title}/${id}/${poster}`);

    /*
    //url에 데이터를 담고 마스킹도 수행하여 전달하는 방법
    router.push(
      {
        //전달 url
        pathname: `/movies/${id}`,
        //정보 전달 부분 query
        query: {
          title,
        },
      },
      //유저에게 나타날 url의 모습(alias)
      `/movies/${id}`
    );
    */
  };

  return (
    <div className="container">
      <Seo title="Home" />

      {results?.map((movie) => (
        <div
          className="movie"
          key={movie.id}
          onClick={() => onClick(movie.id, movie.original_title, movie.poster_path)}
        >
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          {/* nextjs의 링크 넘겨주는 방법 2. Link
              <Link> 태그에 <a> 태그를 감쌈
              연결 url은 <Link> 태그 안에 href 속성으로 작성 */}
          <h4>
            <Link href={`/movies/${movie.original_title}/${movie.id}`}>
              <a>{movie.original_title}</a>
            </Link>
          </h4>
        </div>
      ))}

      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

/** 
 * 서버단에서만 실행되는 getServerSideProps()
 * 함수명 고정(변경불가)
 *
 * getServerSideProps()를 통해 모든 데이터를 받은 뒤 화면에 출력시키기 구현가능
 * 이는 JS가 아닌 전부 html로 출력됨(All html이라 검색엔진에 잘 잡힘)
 *
 * 리턴하는 props를 위의 Home()에서 받아 프론트 작업 수행
 */
export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();

  return {
    props: {
      results,
    },
  };
}
