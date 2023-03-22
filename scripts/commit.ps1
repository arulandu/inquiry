$message=$args[0];
& "./scripts/update.ps1";
git add -A; git commit -m "$message"; git push;