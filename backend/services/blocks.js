import {getFirestore} from "firebase-admin/firestore";
import admin from "firebase-admin";
import middleware from '../middleware/index.js'

const db = getFirestore()

const blocksService = {
    async create(req) {
        const blocksRef = db.collection('blocks');
        const user = await middleware.getUser(req)
        await blocksRef.doc().set({
            userId: user.uid,
            text: req.body.text,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        return {message: 'Text block created successfully!'}
    },
    async get(req) {
        const user = await middleware.getUser(req)
        const blocksRef = db.collection('blocks').where('userId', '==', user.uid);
        const blocks = await blocksRef.get();
        return blocks.docs.map((block) => {
            return block.data()
        })
    }
}

export default blocksService
