<template>
    <div class="card py-4 px-2" style="max-width: 30rem;">
    <div class="container mt-3">

        <h3 class="text-primary">
            <NuxtLink to="/users"><i class="bx bx-left-arrow-alt"></i></NuxtLink>
             <u><b>Update User</b></u>
        </h3>

        <form class="mt-3" action="#" method="POST" enctype="multipart/form-data">

            <div class="mb-3">
                <label for="full-name" class="form-label">
                    Full name <span class="text-danger">*</span>
                </label>
                <input
                    type="text"
                    class="form-control"
                    id="full-name"
                    value="John Doe"
                    name="name"
                    required
                >
            </div>

            <div class="mb-3">
                <label for="dob" class="form-label">
                    Date of birth <span class="text-danger">*</span>
                </label>
                <input
                    type="date"
                    class="form-control"
                    id="dob"
                    value="2000-01-15"
                    name="dob"
                    required
                >
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">
                    Email address <span class="text-danger">*</span>
                </label>
                <input
                    type="email"
                    class="form-control"
                    id="email"
                    value="john@example.com"
                    name="email"
                    required
                >
                <div id="emailHelp" class="form-text">
                    We'll never share your email with anyone else.
                </div>
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">
                    Password <span class="text-danger">*</span>
                </label>
                <input
                    type="password"
                    class="form-control"
                    id="password"
                    value="password123"
                    name="password"
                    required
                >
            </div>

            <div class="mb-3">
                <label for="image" class="form-label">
                    Profile picture <span class="text-danger">*</span>
                </label>

                <div class="update-profile-pic">
                    <img
                        src="/assets/images/default-user.png"
                        alt="profile-image"
                    >

                    <input
                        type="file"
                        class="form-control"
                        id="image"
                        name="image"
                    >
                </div>
            </div>

            <button type="submit" class="btn btn-dark mt-2">
                UPDATE
            </button>

        </form>

        <br>

    </div>
</div>
</template>