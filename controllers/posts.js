import Post from '../models/post.js'

//CREATE method
export const createPost = async (req, res) => {
    try {
        const post = new Post(req.body)
        await post.save()
        res.status(201).json(post)
    } catch (error) {
        restart.status(400).json({ success: flase, error} )
    }
}

//READ method
//tells mongoose to go and retrieve everything from the db and send it in json format with status code 200
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json({ success: false, error })
    }
}

//UPDATE method
export const updatePost = async (req, res) => {
    const allowedOptions = ['title', 'content', 'tags', 'author']
    const selectedOption = Object.keys(req.body)
    const doesExists = selectedOption.every(option => allowedOptions.includes(option))

    if (!doesExists){
        return res.status(404).json({ success: false, error })
    }
    try {
        const post = await Post.findById({ _id: req.params.id })
        selectedOption.forEach(option => post[option] = req.body[option])
        await post.save()
        restart.status(200).json(post)
    } catch {
        restart.status(404).json({ success: false, error })
    }
}

//DELETE method
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.id })
        res.status(200).json('Post was deleted!')
    } catch (error) {
        res.status(404).json({ success: false, error })
    }
}