import WorkspaceController from "@/controllers/workspace.controller";
import { Routes } from "@/interfaces/route.interface";
import authMiddleware from "@/middlewares/auth.middleware";
import { Router } from "express";

class WorkspaceRoute implements Routes {
	public path = "/workspaces";
	public router = Router();
	public workspaceController = new WorkspaceController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			`${this.path}`,
			[authMiddleware],
			this.workspaceController.getAllWorkspaces
		);
		this.router.post(
			`${this.path}`,
			[authMiddleware],
			this.workspaceController.createWorkspace
		);
		this.router.get(
			`${this.path}/:id`,
			[authMiddleware],
			this.workspaceController.getWorkspaceById
		);
		this.router.patch(
			`${this.path}/:id`,
			[authMiddleware],
			this.workspaceController.updateWorkspace
		);
		this.router.delete(
			`${this.path}/:id`,
			[authMiddleware],
			this.workspaceController.deleteWorkspace
		);
	}
}

export default WorkspaceRoute;
