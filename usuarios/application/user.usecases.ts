import { json } from "express";
import User from "../domain/User";
import UserRepository from "../domain/user.repository";

export class UsersUseCases {

    private userRepository: UserRepository;
    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }

    async registrar(user: User){
        return await this.userRepository.registrarUser(user);
    }

    async logIn(user: User){
        return await this.userRepository.logIn(user);
    }

    getUserById(id: string){
        return this.userRepository.getUserById(id);
    }
}