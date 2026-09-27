<template>
    <div class="card py-4 px-2" style="max-width: 30rem;">
        <div class="container mt-3">
            <h3 class="text-primary"> 
                <NuxtLink to="/users"><i class="bx bx-left-arrow-alt"></i></NuxtLink>
                <u><b>Create User</b></u>
            </h3>

            <form class="mt-3" action="/" enctype="multipart/form-data" method="POST">
                <div class="mb-3">
                    <label for="full-name" class="form-label">Full name <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="full-name" name="name" required />
                </div>
                <div class="mb-3">
                    <label for="dob" class="form-label">Date of birth<span class="text-danger">*</span></label>
                    <input type="date" class="form-control" id="dob" name="dob" required />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address <span class="text-danger">*</span></label>
                    <input type="email" class="form-control" id="email" name="email" required />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password <span class="text-danger">*</span></label>
                    <input type="password" class="form-control" id="password" name="password" required />
                </div>
                <div class="mb-3">
                    <label for="image" class="form-label">Profile picture<span class="text-danger">*</span></label>
                    <input type="file" class="form-control" id="image" name="image" accept="image/*" />
                </div>

                <button type="submit" class="btn btn-dark mt-2">REGISTER</button>
            </form>
            <br>
        </div>
    </div>
</template>