const getTags = (tags)=>{
    const counter = {
    }
    tags.forEach(tag => {
        if(counter[tag]){
            counter[tag] += 1
        } else {
            counter[tag] = 1
        }
    });
    const keyValueArray = Object.entries(counter)
    
    keyValueArray.sort((a, b) => b[1] - a[1]);
}

export default getTags;