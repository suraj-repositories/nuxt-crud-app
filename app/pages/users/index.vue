<template>
    <div class="card py-4 px-2">
        <div class="container mt-3">

            <div class="d-flex g-3 justify-content-between align-items-center">
                <h3 class="text-primary py-2">
                    <u><b>CRUD Application</b></u>
                </h3>


            </div>

            <br>

            <div class="d-flex g-3">
                <a href="/create" class="btn btn-dark d-flex align-items-center justify-content-center btn-md">
                    <i class="bx bxs-user-plus me-2 fs-4"></i> Create User
                </a>


            </div>

            <div class="scroll-box mt-4">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col" class="col-1">#</th>
                            <th scope="col" class="col-3">Name</th>
                            <th scope="col" class="col-2">DOB</th>
                            <th scope="col" class="col-4">Email</th>
                            <th scope="col" class="col-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td colspan="5" class="text-center py-4">No users found</td>
                        </tr>

                        <tr>
                            <th scope="row">
                                1
                            </th>
                            <td>
                                <div class="user">

                                    <img src="/assets/images/default-user.png" alt="profile picture">

                                    <span>
                                        Shubham kumar
                                    </span>
                                </div>
                            </td>
                            <td>
                                12 duly
                            </td>
                            <td>
                                email@gmail.com
                            </td>
                            <td>
                                <div class="action-btns">
                                    <a href="/edit" class="btn btn-dark mx-2">
                                        <i class="bx bxs-edit fs-5"></i>
                                    </a>

                                    <form action="/" method="POST"
                                        onsubmit="return confirm('Are you sure you want to delete this user?');">
                                        <button type="submit" class="btn btn-danger mx-2">
                                            <i class="bx bxs-trash-alt fs-5"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <nav aria-label="Page navigation" class="d-flex">
                <ul class="pagination ms-auto">
                    <li class="page-item">
                        <a class="page-link" href="#">Previous</a>
                    </li>

                    <li class="page-item active">
                        <a class="page-link" href="#">1</a>
                    </li>

                    <li class="page-item">
                        <a class="page-link" href="#">2</a>
                    </li>

                    <li class="page-item">
                        <a class="page-link" href="#">3</a>
                    </li>

                    <li class="page-item">
                        <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>

        </div>
    </div>
</template>