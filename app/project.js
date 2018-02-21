// app/project.js
const permissions = require('./permission.js');
module.exports = (db) => {
	return {
		getProject: (projectId, cb) => {
			db.model.Project.findOne({ projectId: projectId })
				.populate({
					path: "author",
					select: "name type school"
				})
				.populate({
					path: "statuses",
					populate: {
						path: "editor",
						select: "name type"
					}
				})
				.populate({
					path: "status",
					populate: {
						path: "editor",
						select: "name type"
					}
				})
				.exec((err, project) => {
					if (err) return cb(err);
					cb(null, project);
				});
		},
		getProjects: (user, cb) => {
			// Check if user exists
			if (user.type == "Researcher") {
				db.model.Project.find({ author: user._id })
					.populate({
						path: "author",
						select: "name type school"
					})
					.populate({
						path: "statuses",
						populate: {
							path: "editor",
							select: "name type"
						}
					})
					.populate({
						path: "status",
						populate: {
							path: "editor",
							select: "name type"
						}
					})
					.exec((err, projects) => {
						cb(null, projects);
					});
			} else {
				db.model.Project.find({ })
					.populate({
						path: "author",
						select: "name type school"
					})
					.populate({
						path: "statuses",
						populate: {
							path: "editor",
							select: "name type"
						}
					})
					.populate({
						path: "status",
						populate: {
							path: "editor",
							select: "name type"
						}
					})
					.exec((err, projects) => {
						cb(null, projects);
					});
			}
		},
		updateStatus: (action, comment, projectId, user, cb) => {
			// Check status change is valid
			if (!permissions[user.type][action])
				return cb(new Error(
					"User type " + user.type + " cannot change status to " + action));

			// Get the project
			db.model.Project.findOne({ projectId: projectId }, (err, project) => {
					if (err) return cb(err);
					if (!project)
						return cb(new Error("No project exists with ID" + projectId));

					// Create the entity
					var nStatus = new db.model.ProjectStatus({
						statusMessage: action,
						editor: user._id,
						comment: comment,
						projectId: project._id,
					});
					// Save to the database
					nStatus.save(err => {
						if (err) return cb(err);
						project.status = nStatus._id;
						project.statuses.push(nStatus._id);
						project.save(err => {
							if (err) return cb(err);
							cb();
						});
					});
				});
		},

		createProject: (user, title, description, cb) => {
			//Project ID

			var project = new db.model.Project({
				projectId: 4,
				title: title,
				description: description,
				author: user._id,
			});

			cb(project);

		}
	};
};
