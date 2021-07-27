import noteSchema from './database/schemas/noteSchema.js';

const linkGenerator = () => {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const Link = alphabet[Math.floor(Math.random() * 51)] + alphabet[Math.floor(Math.random() * 51)] + alphabet[Math.floor(Math.random() * 51)] + alphabet[Math.floor(Math.random() * 51)] + alphabet[Math.floor(Math.random() * 51)]
    return Link;
}

const generateLink = async () => {
    let Link = linkGenerator();
    let newLink;
    try {
        let dbLink = await noteSchema.findOne({ link: Link });
        if (dbLink === null) {
            newLink = Link;
        } else {
            while (dbLink !== null) {
                newLink = linkGenerator();
            }
        }
    } catch (err) {
        console.log(err)
    }

    return newLink;
}

export default generateLink;