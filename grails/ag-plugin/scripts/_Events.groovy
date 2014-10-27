includeTargets << grailsScript("_GrailsEvents")
includeTargets << grailsScript("_GrailsSettings")

eventCleanStart = {
	Ant.delete('dir':'target')
}

//eventCompileStart = {
//	File angleGrinderDir = new File(System.getProperty('user.dir')).parentFile.parentFile
//	println "ANGLE_GRINDER_DIR=${angleGrinderDir.absolutePath}"
//	File scripts = new File(angleGrinderDir,'script')
//	File updateAgPluginScript = new File(scripts, 'update-ag-plugin')
//	println "Executing script ${updateAgPluginScript.absolutePath}"
//	// FIXME get this script's output without using --verbose
//	ant.exec(executable: updateAgPluginScript.absolutePath, dir: angleGrinderDir.absolutePath)
//	println "...done."
//}
