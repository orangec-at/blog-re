import { defineDocumentType, makeSource } from "contentlayer/source-files";

const stripPostsPrefix = (path: string) => path.replace(/^posts\//, "");

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    summary: { type: "string", required: true },
    domain: { type: "string", required: true },
    layout: { type: "enum", options: ["full", "narrow"], required: true },
    demoComponent: { type: "string" },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => stripPostsPrefix(post._raw.flattenedPath),
    },
    url: {
      type: "string",
      resolve: (post) => `/posts/${stripPostsPrefix(post._raw.flattenedPath)}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  disableImportAliasWarning: true,
});
