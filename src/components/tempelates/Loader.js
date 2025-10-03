import { FadeLoader } from "react-spinners";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#fff",
      }}
    >
      <FadeLoader color="#2feb53" height={20} width={3} />
    </div>
  );
}

export default Loader;
