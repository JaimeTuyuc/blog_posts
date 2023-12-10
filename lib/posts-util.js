import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const postDirectory = path.join(process.cwd(), 'content', 'posts');

export function getPostsFiles() { 
  return fs.readdirSync(postDirectory);
}

export function getPostData(postIdentifier) {
  
  const fileName = postIdentifier.replace(/\.md$/, ''); // removes the .md extension

  const filePath = path.join(postDirectory, `${fileName}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return{
    slug: fileName,
    ...data,
    content
  };
}

export function getAllPosts() { 
  const postFiles = getPostsFiles();

  //! Get all posts
  const allPosts = postFiles.map(postFile => getPostData(postFile));
  //! Filter all posts
  return allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1);
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.isFeatured);
}