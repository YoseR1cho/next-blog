import mongoose from 'mongoose';

export default async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI); // 连接数据库
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log("数据库连接成功")
        })

        connection.on('error', (err) => {
            console.log('数据库连接失败' + err);
            process.exit();
        })

    } catch (error) {
        throw new Error(error);
    }
}

