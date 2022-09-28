// where images upload
const Root = './public';

// where user images upload
const imageDir = '/images';

// upload user profile image (Start) -------------------------------------------------------------------

// ----- where user images upload
const profileDir = '/Profile';

// ----- merge root + imageDir + profileDir for upload
const uploadUserDirectory = `${Root}${imageDir}${profileDir}/`;

// ----- merge root + imageDir + profileDir for save in feild ( collection )
const savingUserDirectory = `${imageDir}${profileDir}/`;

// (End) -----------------------------------------------------------------------------------------------

// upload Blog Cover image (Start) ---------------------------------------------------------------------

// ----- where blog cover upload
const blogDir = '/blogs';

// ----- merge root + imageDir + profileDir for upload
const uploadBlogDirectory = `${Root}${imageDir}${blogDir}/`;

// ----- merge root + imageDir + profileDir for save in feild ( collection )
const savingBlogDirectory = `${imageDir}${blogDir}/`;

// (End) -------------------------------------------------------------------------------------------------

module.exports = {
    imageDir,

    profileDir,
    uploadUserDirectory,
    savingUserDirectory,

    blogDir,
    uploadBlogDirectory,
    savingBlogDirectory,
}