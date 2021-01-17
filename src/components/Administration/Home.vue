<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-4">
            <router-link to="/manageDepartments" type="button" class="btn btn-block btn-lg btn-primary">
              Manage Departments
            </router-link>
          </div>
          <div class="col-md-4">
            <router-link to="/manageGroups" type="button" class="btn btn-lg btn-block btn-primary">
              Manage Groups
            </router-link>
          </div>
          <div class="col-md-4">
            <router-link to="/manageProfessors" type="button" class="btn btn-lg btn-block btn-primary">
              Manage Professors
            </router-link>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-md-12">
            <router-view name="manageView"></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
