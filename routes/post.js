const express = require("express");
const router = express.Router();
const Post = require("../schemas/post.js");


// 게시글 전체 조회 API
router.get("/post", async (req, res) => {
    console.log("ㅇㅇ")
    const posts = await Post.find({});
    res.json({ data: posts });
});

// 상품 상세 조회 API
router.get("/goods/:goodsId", (req, res) => {
    const { goodsId } = req.params;
    const [detale] = goods.filter((good) => Number(goodsId) === good.goodsId)
    res.status(200).json({ detale });
});



router.post("/post", async (req, res) => {

    try {
        const { user, password, title, content } = req.body;
        console.log(req.body)

        // comment
        await Post.create({ user, password, title, content });
        return res.status(200).json({ result: "success" })

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }

})

// 게시글 수정
router.put("/post/:_postId", async (req, res) => {
    const { password, title, content } = req.body;
    const { _postId } = req.params
    console.log(password, title, content);
    const updatedPost = await Post.findOneAndUpdate(
        { _id: _postId },
        { title, content, password },
        { new: true }
    )
    console.log("dd");
    res.status(200).json({ success: updatedPost });
})


// 게시글 삭제
router.delete("/post/:_postId", async (req, res) => {
    const { _postId } = req.params;
    const existsPost = await Post.findOneAndDelete({_id: _postId})
    res.json({ result: "success" });
})



const Goods = require("../schemas/goods.js");
router.post("/goods", async (req, res) => {
    const { goodsId, name, thumbnailUrl, category, price } = req.body;
    const goods = await Goods.find({ goodsId });
    if (goods.length) {
        return res.status(400).json({
            success: false,
            errorMessage: "이미 존재하는 ID 값 입니다."
        });
    }
    const createGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });
    res.json({ goods: createGoods });
})

module.exports = router;