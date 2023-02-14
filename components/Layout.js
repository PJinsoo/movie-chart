import NavBar from "./NavBar";

/**
 * 모든 페이지에 적용될 레이아웃 컴포넌트
 * 파라미터인 children은 레이아웃이 적용될 JS파일을 의미
 */
export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
