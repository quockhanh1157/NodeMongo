import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = Number(process.env.BCRYPT_SALT_ROUND || 10);
const salt = bcrypt.genSaltSync(saltRounds);
/**
 * Mã hóa mật khẩu
 * @param password - Mật khẩu gốc
 * @returns Mật khẩu đã hash
 */

const hashPassword = async (password: string) => {
    try {
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.log(error);
        throw new Error("Lỗi khi mã hóa mật khẩu");
    }
}

/**
 * So sánh mật khẩu người dùng nhập với mật khẩu đã hash
 * @param password - Mật khẩu gốc
 * @param hash - Mật khẩu đã hash từ database
 * @returns true nếu mật khẩu đúng, ngược lại false
 */
const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        throw new Error("Lỗi khi kiểm tra mật khẩu");
    }
};

export {hashPassword, comparePassword}