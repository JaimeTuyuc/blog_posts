import classes from './post-content.module.css'
import PostHeader from './post-header'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import { Prism as SyntaxHighLithgher } from 'react-syntax-highlighter'
// const SyntaxHighLithgher = require('react-syntax-highlighter/dist/cjs/prism-light')
import { atomDark  } from 'react-syntax-highlighter/dist/cjs/styles/prism'

// https://www.mozzlog.com/blog/react-syntax-highlighter-tutorial
const PostContent = (props) => {
  const { post } = props
  const imagePath = `/images/posts/${post.image}`

  const customeComponents = {
    // img(image) {
    //   return (
    //     <div>
    //       <Image src={`${image.src}`} alt={image.alt.replace(/ /g, '-').toLowerCase()} width={600} height={300} />
    //     </div>
    //   )
    // },
    p(paragraph) {
      const { node } = paragraph
      if (node.children[0].tagName === 'img') {
        const image = node.children[0]
        return (
          <div className={classes.image}>
            <Image
              src={`${image.properties.src}`}
              alt={image.properties.alt.replace(/ /g, '-').toLowerCase()}
              width={600}
              height={300}
            />
          </div>
        )
      } else {
        return <p>{paragraph.children}</p>
      }
    },
    code(props) {
      const { className, children } = props
      const language = className.split('-')[1] // className is something like language-js => we need the "js" part here
      return (
        <SyntaxHighLithgher language={language} children={children} style={atomDark} />
      )
    },
  }

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customeComponents}>
        {post.content}
      </ReactMarkdown>
    </article>
  )
}

export default PostContent
