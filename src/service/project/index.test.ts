import { ProjectRepositoryMock } from "../../__test_/mock/mockedClass";
import { findProjects, findProject, createProject, deleteProject, updateProject, findProjectsByOwner, findProjectsByStatus, findProjectByName, checkUserOnProject, checkOwnerOfProject } from ".";
import { TeamRepositoryMock } from "../../__test_/mock/mockedClass";

const project = {
  id_owner: 1,
  name: "test",
  description: "test",
  toJSON: () => {return {
    id_owner: 1,
    name: "test",
    description: "test",
  };}
};

const team = {
  id_team: 1,
  id_project: 1,
  id_users: 1,
  some: () => true,
};

describe("findProjects", () => {
  it("should return", async() => {
    const projectRepository = new ProjectRepositoryMock();
    projectRepository.findAll = jest.fn().mockReturnValue([]);
    await expect(findProjects(projectRepository, false)).rejects.toThrowError("No projects on database, please create one before trying to find.");
  });

  it("should return an array of unfiltered projects", async() => {
    const projectRepository = new ProjectRepositoryMock();
    projectRepository.findAll = jest.fn().mockReturnValue([project]);
    await expect(findProjects(projectRepository, false)).resolves.toEqual([project.toJSON()]);
    await expect(findProjects(projectRepository, false)).resolves.toEqual([project.toJSON()]);
  });

  it("should return an array of filtered projects", async() => {
    const projectRepository = new ProjectRepositoryMock();
    projectRepository.findAll = jest.fn().mockReturnValue([project]);
    await expect(findProjects(projectRepository, true)).resolves.toEqual([project.toJSON()]);
  });
});

describe("findProject", () => {
  it("should return an error if the project is not found", async() => {
    const projectRepository = new ProjectRepositoryMock();
    await expect(findProject(1, projectRepository, false)).rejects.toThrowError("Project not found!");
  });
    
  it("should return a unfiltered project", async() => {
    const projectRepository = new ProjectRepositoryMock();
    projectRepository.findByPk = jest.fn().mockReturnValue(project);
    await expect(findProject(1, projectRepository, false)).resolves.toEqual(project.toJSON());
    await expect(findProject(1, projectRepository, false)).resolves.toEqual(project.toJSON());
  });
  
  it("should return a filtered project", async() => {
    const projectRepository = new ProjectRepositoryMock();
    projectRepository.findByPk = jest.fn().mockReturnValue(project);
    await expect(findProject(1, projectRepository, true)).resolves.toEqual(project.toJSON());
  });
});

describe("createProject", () => {
  it("should return an error if the project already exists", async() => {
    const projectRepository = new ProjectRepositoryMock();
    projectRepository.projectExists = jest.fn().mockReturnValue(true);
    await expect(createProject(project, projectRepository)).rejects.toThrowError("Project already exists.");
  });
  
  it("should return a project", async() => {
    const projectRepository = new ProjectRepositoryMock();
    projectRepository.projectExists = jest.fn().mockReturnValue(false);
    projectRepository.create = jest.fn().mockReturnValue(project);
    await expect(createProject(project, projectRepository)).resolves.toEqual(project);
  });
});

describe("deleteProject", () => {
  it("should return an error if the project is not found", async() => {
    const projectRepository = new ProjectRepositoryMock();
    await expect(deleteProject(1, projectRepository)).rejects.toThrowError("Project not found!");
  });
});

describe("updateProject", () => {
  it("should return an error if the parameters are invalid", async() => {
    const projectRepository = new ProjectRepositoryMock();
    projectRepository.findByPk = jest.fn().mockReturnValue(project);
    await expect(updateProject(1, project, projectRepository)).rejects.toThrowError("Invalid parameters.");
  });

  it("should return an error if the project is not found", async() => {
    const projectRepository = new ProjectRepositoryMock();
    await expect(updateProject(1, project, projectRepository)).rejects.toThrowError("Project not found!");
  });
});

describe("findProjectsByOwner", () => {
  it("should return an error if the project is not found", async() => {
    const projectRepository = new ProjectRepositoryMock();
    await expect(findProjectsByOwner(1, projectRepository)).rejects.toThrowError("No projects found for this owner.");
  });

  it("should return an array of projects", async() => {
    const projectRepository = new ProjectRepositoryMock();
    projectRepository.findByOwner = jest.fn().mockReturnValue([project]);
    await expect(findProjectsByOwner(1, projectRepository)).resolves.toEqual([project]);
  });
});

describe("findProjectsByStatus", () => {
  it("Should return an error if the status is not valid", async() => {
    const projectRepository = new ProjectRepositoryMock();
    await expect(findProjectsByStatus("test", projectRepository)).rejects.toThrowError("Invalid status.");
  });

  it("should return an error if the project is not found", async() => {
    const projectRepository = new ProjectRepositoryMock();
    await expect(findProjectsByStatus("active", projectRepository)).rejects.toThrowError("No projects found for this status.");
  });

  it("should return an array of projects", async() => {
    const projectRepository = new ProjectRepositoryMock();
    projectRepository.findByStatus = jest.fn().mockReturnValue([project]);
    await expect(findProjectsByStatus("active", projectRepository)).resolves.toEqual([project]);
  });
});

describe("findProjectByName", () => {
  it("should return an error if the project is not found", async() => {
    const projectRepository = new ProjectRepositoryMock();
    await expect(findProjectByName("test", projectRepository)).rejects.toThrowError("No project found with this name.");
  });

  it("should return a project", async() => {
    const projectRepository = new ProjectRepositoryMock();
    projectRepository.projectByName = jest.fn().mockReturnValue(project);
    await expect(findProjectByName("test", projectRepository)).resolves.toEqual(project);
  });
});

describe("checkUserOnProject", () => {
  it("should return an error if the project is not found", async() => {
    const teamRepository = new TeamRepositoryMock();
    const projectRepository = new ProjectRepositoryMock();
    teamRepository.findByIdProject = jest.fn().mockReturnValue([]);
    await expect(checkUserOnProject(teamRepository, projectRepository, 1, 1)).rejects.toThrowError("No team found for this project.");
  });

  it("should return a project", async() => {
    const projectRepository = new ProjectRepositoryMock();
    const teamRepository = new TeamRepositoryMock();
    teamRepository.findByIdProject = jest.fn().mockReturnValue(team);
    await expect(checkUserOnProject(teamRepository, projectRepository, 1, 1)).rejects.toThrowError("No project found.");
  });

  it("should return a project", async() => {
    const projectRepository = new ProjectRepositoryMock();
    const teamRepository = new TeamRepositoryMock();
    teamRepository.findByIdProject = jest.fn().mockReturnValue(team);
    projectRepository.findByPk = jest.fn().mockReturnValue(project);
    await expect(checkUserOnProject(teamRepository, projectRepository, 1, 1)).resolves.toEqual(true);
  });
});

describe("checkOwnerProject", () => {
  it("should return an error if the project is not found", async() => {
    const projectRepository = new ProjectRepositoryMock();
    await expect(checkOwnerOfProject(projectRepository , 1, 1)).rejects.toThrowError("No project found.");
  });

  it("should return a true if id_owner equals to ownerId", async() => {
    const projectRepository = new ProjectRepositoryMock();
    const teamRepository = new TeamRepositoryMock();
    teamRepository.findByIdProject = jest.fn().mockReturnValue(team);
    projectRepository.findByPk = jest.fn().mockReturnValue(project);
    await expect(checkOwnerOfProject(projectRepository , 1, 1)).resolves.toEqual(true);
  });
});