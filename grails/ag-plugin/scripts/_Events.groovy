includeTargets << grailsScript("_GrailsEvents")
includeTargets << grailsScript("_GrailsSettings")

eventCleanStart = {
	Ant.delete('dir':'target')
}

eventCompileStart = {
	File angleGrinderDir = new File(System.getProperty('user.dir')).parentFile.parentFile
	println "ANGLE_GRINDER_DIR=${angleGrinderDir.absolutePath}"
	File scripts = new File(angleGrinderDir,'script')
	File updateAgPluginScript = new File(scripts, 'update-ag-plugin')
	// println "update-ag-plugin script is at ${updateAgPluginScript.absolutePath}"
	// println "The script ${updateAgPluginScript.exists()?'exists.':'does not exist.'}"
	def scriptProc = [
		updateAgPluginScript.absolutePath,
		angleGrinderDir.absolutePath
	].execute()
	println "	...waiting"
	scriptProc.waitFor()
	println scriptProc.err.txt
	println scriptProc.in.txt // this is 'out' for the script
	if(scriptProc.exitValue()) {
		def msg = "Failed to update-ag-plugin.  Exited with ${scriptProc.exitValue()}"
		return
	}
}
