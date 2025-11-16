"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const CreateUserController_1 = require("./controllers/userController/CreateUserController");
const AuthUserController_1 = require("./controllers/userController/AuthUserController");
const GetUserController_1 = require("./controllers/userController/GetUserController");
const AddFriendController_1 = require("./controllers/friendsController/AddFriendController");
const GetFriendsController_1 = require("./controllers/friendsController/GetFriendsController");
const RejectFriendController_1 = require("./controllers/friendsController/RejectFriendController");
const PendingFriendRequestController_1 = require("./controllers/friendsController/PendingFriendRequestController");
const SendMessageController_1 = require("./controllers/messagesController/SendMessageController");
const GetMessagesController_1 = require("./controllers/messagesController/GetMessagesController");
const ReadMessageController_1 = require("./controllers/messagesController/ReadMessageController");
const CountUnreadController_1 = require("./controllers/messagesController/CountUnreadController");
const router = (0, express_1.Router)();
exports.router = router;
//Users
router.post("/register", new CreateUserController_1.CreateUserController().handle);
router.post("/session", new AuthUserController_1.AuthUserController().handle);
router.get("/me", isAuthenticated_1.isAuthenticated, new GetUserController_1.GetUserController().handle);
//Friends
router.get("/friends", isAuthenticated_1.isAuthenticated, new GetFriendsController_1.GetFriendsController().handle);
router.post("/friend/add-friend", isAuthenticated_1.isAuthenticated, new AddFriendController_1.AddFriendController().handle);
router.get("/friend/pending", isAuthenticated_1.isAuthenticated, new PendingFriendRequestController_1.PendingFriendRequestController().handle);
router.delete("/friend/reject", isAuthenticated_1.isAuthenticated, new RejectFriendController_1.RejectFriendController().handle);
//Direct Messages
router.post("/direct", isAuthenticated_1.isAuthenticated, new SendMessageController_1.SendMessageController().handle);
router.get("/direct/:conversationId", isAuthenticated_1.isAuthenticated, new GetMessagesController_1.GetMessagesController().handle);
router.put("/readMessage", isAuthenticated_1.isAuthenticated, new ReadMessageController_1.ReadMessageController().handle);
router.get("/unreadMessages/:friendId", isAuthenticated_1.isAuthenticated, new CountUnreadController_1.CountUnreadController().handle);
//# sourceMappingURL=routes.js.map