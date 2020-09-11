export const selectComment = (comment, id) => {
    console.log("selectors", id)
    let selectedComment = comment.filter((ele) => {
        let com =  ele._id == id
        // console.log("selectors", com)
    })
    return selectedComment
}