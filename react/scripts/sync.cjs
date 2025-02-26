const shelljs = require("shelljs");
const fs = require("fs");
const path = require("path");
const urlResolve = require("resolve-pathname");

// 작업자 프로젝트 루트 경로로 변경
const PROJECT_PATH = "/Users/changyu/Base/etc/spring-boot-react-sample";
const INDEX_PATH = `${PROJECT_PATH}/src/main/webapp/WEB-INF/views/index.jsp`;
const ASSET_PATH = `${PROJECT_PATH}/src/main/resources/static/react-sample`;
const REACT_BUILD = "../react-dist";

const CONFIG = {
  index_path: path.resolve(__dirname, INDEX_PATH),
  asset_path: path.resolve(__dirname, ASSET_PATH),
  react_build: path.resolve(__dirname, REACT_BUILD),
  public_url: "/react-sample/",
};

// React 빌드 실행
shelljs.exec("yarn build", {
  cwd: path.resolve(__dirname, ".."),
});

// 기존 에셋 삭제 후 새 빌드 복사
shelljs.rm("-rf", path.join(CONFIG.asset_path, "*"));
shelljs.cp("-rf", path.join(CONFIG.react_build, "assets/*"), CONFIG.asset_path);

// JSP 파일 읽기
const jsp = fs.readFileSync(CONFIG.index_path, "utf-8");

// 빌드된 JS 파일 찾기
const files = shelljs.ls(CONFIG.asset_path).filter((p) => p.endsWith(".js"));
const jsFiles = files.map((f) => {
  const chunkUrl = urlResolve(f, CONFIG.public_url);
  return `<script type="module" crossorigin src="${chunkUrl}"></script>`;
});

// JSP 파일 업데이트
const newJsp = jsp.replace(
  /<script type="module" crossorigin src="\/react-sample\/.*?"><\/script>/gm,
  jsFiles.join("\n")
);

fs.writeFileSync(CONFIG.index_path, newJsp, "utf-8");
console.log("JSP updated with latest React build assets!");

// 업데이트 완료 후 빌드 파일 제거
shelljs.rm("-rf", path.join(CONFIG.react_build));
