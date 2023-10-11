const parseTags = (messageString)=>{
    const parseTags = messageString.split(' ').filter(tag => tag.startsWith('#'))
    const tags = new Set(parseTags.map(tag => tag.slice(1)))
    return tags
}

export default parseTags;