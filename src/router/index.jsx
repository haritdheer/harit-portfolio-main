import { createBrowserRouter } from "react-router-dom";

const pages = import.meta.glob("../pages/**/*.jsx", { eager: true });

const routes = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.jsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  let fileNamePathSegments = fileName.split("/");
  let normalizedPathName = "";
  fileNamePathSegments.map((segment) => {
    let normalizedSegment = segment.includes("$")
      ? segment.replace("$", ":")
      : segment.replace(/\/index/, "");
    if (!normalizedSegment.includes("index"))
      normalizedPathName = normalizedPathName.concat(`/${normalizedSegment}`);
  });

  if (fileName === "home/index") {
    routes.push({
      path: "/",
      Element: pages["../pages/home/index.jsx"].default,
      loader: pages["../pages/home/index.jsx"]?.loader,
      action: pages["../pages/home/index.jsx"]?.action,
      ErrorBoundary: pages["../pages/home/index.jsx"]?.ErrorBoundary,
    });
  }

  routes.push({
    path: fileName === "index" ? "/" : `${normalizedPathName.toLowerCase()}`,
    Element: pages[path].default,
    loader: pages[path]?.loader,
    action: pages[path]?.action,
    ErrorBoundary: pages[path]?.ErrorBoundary,
  });
}

export const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <Element />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);
