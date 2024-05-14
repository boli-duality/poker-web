namespace API {
  namespace User{
    interface RegisterParams {
      nickname: string
      password: string
    }

    interface LoginParams {
      nickname: string
      password: string
    }

    interface User {
      id: string
      nickname: string
    }
  }
}
