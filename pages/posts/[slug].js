import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";
import Head from 'next/head';

const PostDetailPage = ({ post }) => {   // export a deafult page called PostDetailPage
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  )
}

export function getStaticProps(ctx) {

  const { params } = ctx;
  const { slug } = params;

  const singlePost = getPostData(slug);
  return {
    props: {
      post: singlePost
    }, 
    revalidate: 600
  }
}

export function getStaticPaths() {

  const postFiles = getPostsFiles();
  const slugs = postFiles.map((postFile) => postFile.replace(/\.md$/, ''));
  const slugParams = slugs.map((slug) => ({ params: { slug: slug } }));
  return {
    paths: slugParams,
    fallback: 'blocking'
  }
}

export default PostDetailPage;