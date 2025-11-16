import { Router } from "express";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateUserController } from "./controllers/userController/CreateUserController";
import { AuthUserController } from "./controllers/userController/AuthUserController";
import { GetUserController } from "./controllers/userController/GetUserController";

import { AddFriendController } from "./controllers/friendsController/AddFriendController";
import { GetFriendsController } from "./controllers/friendsController/GetFriendsController";
import { RejectFriendController } from "./controllers/friendsController/RejectFriendController";
import { PendingFriendRequestController } from "./controllers/friendsController/PendingFriendRequestController";

import { SendMessageController } from "./controllers/messagesController/SendMessageController";
import { GetMessagesController } from "./controllers/messagesController/GetMessagesController";
import { ReadMessageController } from "./controllers/messagesController/ReadMessageController";
import { CountUnreadController } from "./controllers/messagesController/CountUnreadController";


const router = Router();

//Users
router.post("/register", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new GetUserController().handle);

//Friends
router.get("/friends", isAuthenticated, new GetFriendsController().handle);
router.post("/friend/add-friend", isAuthenticated, new AddFriendController().handle);
router.get("/friend/pending", isAuthenticated, new PendingFriendRequestController().handle);
router.delete("/friend/reject", isAuthenticated, new RejectFriendController().handle);

//Direct Messages
router.post("/direct", isAuthenticated, new SendMessageController().handle);
router.get("/direct/:conversationId", isAuthenticated, new GetMessagesController().handle);
router.put("/readMessage", isAuthenticated, new ReadMessageController().handle);
router.get("/unreadMessages/:friendId", isAuthenticated, new CountUnreadController().handle);

export { router };