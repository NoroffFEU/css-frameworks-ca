const parseTitle = (messageString)=>{
    const string = messageString.split(' ')[0]
    if(string.startsWith('!')){
        return string;
    } else {
        return "";
    }
    
}

export default parseTitle;

//    const parseTags = messageString.split(' ').filter(tag => tag.startsWith('@'))
//    const tags = new Set(parseTags.map(tag => tag.slice(1)))