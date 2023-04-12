import { Router, Request, Response, RequestHandler } from 'express';
import express from "express";
import { isAdmin } from "../middleWare/tsValidateMiddleware"
/* import { isAdmin } from "../middleWare/validateMiddleware" */
import { getAllUsers, getAllOperatores, getAllBraches, deleteUser, deleteBranch, editBranchInfo, editOperatorBranch, createBranch, createBranchAndOPerator, createOperator } from "../controllers/administrator_controller"


const router: Router = express.Router();

router.post("/create-operator/token", isAdmin, createOperator);

router.post("/create-branch-and-operator/token", isAdmin, createBranchAndOPerator);

router.post("/create-branch/token", isAdmin, createBranch);

router.put("/edit-operator/:branchId/token", isAdmin, editOperatorBranch);

router.put("/edit-branch-info/:branchId/token", isAdmin, editBranchInfo);

router.delete("/delete-branch/:branchId/token", isAdmin, deleteBranch );

router.delete("/delete-user/:userId/token", isAdmin, deleteUser);

router.get("/get-all-users/:number/token", isAdmin, getAllUsers);

router.get("/get-all-operators/:number/token", isAdmin, getAllOperatores);

router.get("/get-all-branches/:number/token", isAdmin , getAllBraches);

export default router;