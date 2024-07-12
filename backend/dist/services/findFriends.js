var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const findFriends = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // concurrently fetching following and followers
        const [followingResponse, followersResponse] = yield Promise.all([
            fetch(`https://api.github.com/users/${userName}/following`),
            fetch(`https://api.github.com/users/${userName}/followers`)
        ]);
        const following_data = yield followingResponse.json();
        const followers_data = yield followersResponse.json();
        console.log('followers-data', followers_data);
        // creating a Set of logins for quick lookup and o(n) complexity.
        const following_logins = new Set(following_data.map((user) => user.login));
        // filtering users who present in both array  based on the login field from Set.
        const friends = followers_data.filter((user) => following_logins.has(user.login));
        return friends;
    }
    catch (error) {
        console.log(error);
    }
});
