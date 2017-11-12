/**
 * ECE1524 PROJECT JAVASCRIPT LIBRARY
 * Author: Zhenyuan Bo, Xiao Wang
 * Date: Nov 14, 2016
 */


// -------------------------------------------------
// IMPORTS
// -------------------------------------------------

importPackage(Packages.com.pharos.poxclient);
importPackage(Packages.com.pharos.poxclient.rhozet);
importPackage(Packages.com.pharos.poxclient.buydrm);
importPackage(Packages.java.io);
importPackage(Packages.com.pharos.util);
importPackage(Packages.com.pharos.microtime);

//-------------------------------------------------
// FILE HANDLING FUNCTIONS
//-------------------------------------------------

/**
 * Remove a directory
 * 
 * @usage	rmdir(path)
 * @usage	rmdir(path, recurse)
 * @param	{string}	path			directory path
 * @param	{boolean}	[recurse=false] whether to drill down into subdirectories or not
 * @return	{boolean}	if successful
 */
function rmdir(path, recurse) {
	if (recurse == true) {
		if (debug) output("recursing into directory:"+path);
		var dir = new File(path);
		var list = dir.listFiles();
		for ( var i = 0; i < list.length; i++ ) {
			if (list[i].isDirectory()) {
				rmdir(list[i].toString(), true);
			} else {
				if (debug) output("deleting file:"+list[i].toString());
				FileUtils.delFile(list[i].toString());
			}
		}
	}
	if (debug) output("deleting "+path);
	return FileUtils.delFile(path);
}

/**
 * Moves file/directory
 * 
 * @usage	move(orig, newFile)
 * @param	{string}	orig	source path
 * @param	{string}	newFile	destination path
 * @return	{boolean}	if successful
 */
function move(orig, newFile) {
	var file = new File(orig);
	var file2 = new File(newFile);
	if ( file2.isDirectory() || file2.getName().equals("") ) {
		file2 = new File(newFile + file.getName());
	}
	if (debug) output("moving from "+file.toString()+" to "+file2.toString());
	return file.renameTo(file2);
}

/**
 * Copies file/directory
 * 
 * @usage	copy(orig, newFile, function(progress, total) { ... })
 * @param	{string}	orig	source path
 * @param	{string}	newFile	destination path
 * @param   {function(int, int)	progress	callback to report copy progress and total file size to (optional)
 */
function copy(orig, newFile, progress) {
	FileUtils.copyFile(orig, newFile, progress || null);
}

/**
 * Remove a file
 * 
 * @usage	remove(file)
 * @param	{string}	file	full file path
 */
function remove(path) {
	FileUtils.delFile(path);
}

/**
 * Write to a text file
 * 
 * @usage	overwrite(text, file, encoding, append)
 * @param	{string}	text	          text to write
 * @param	{string}	file	          full file path
 * @param   {string}    [encoding=UTF8]   text encoding to write file as
 * @param   {boolean}   [append=false]    whether to append
 */
function overwrite(text, file, encoding, append) {
	append = append || false;
	encoding = encoding || "UTF8";
	
	var os = null;
	try {
		os = new FileOutputStream(file, append);
		var bytes = new java.lang.String(text + "\n").getBytes(encoding);
		os["write(byte[])"](bytes);
	} finally {
		if (os != null) {
			try {
				os.close();
			} catch (err) {
				// Ignore
			}
		}
	}
}

/**
 * Append to a text file
 * 
 * @usage	append(text, file, encoding)
 * @param	{string}	text	text to write
 * @param	{string}	file	full file path
 * @param   {string}    [encoding=UTF8]   text encoding to write file as
 */
function append(text, file, encoding) {
	overwrite(text, file, encoding, true);
}


// -------------------------------------------------
// OUTPUT FUNCTIONS
// -------------------------------------------------

/**
 * Write to standard error
 * 
 * @usage	error(object)
 * @param	{Object}	object	thing to write (e.g. a string or array)
 * @see		show		to display complex objects
 */
function error(object) {
	ShellUtils.error(object);
}

/**
 * Write to standard output
 * 
 * @usage	output(object)
 * @param	{Object}	object	thing to write (e.g. a string or array)
 * @see		show		to display complex objects
 */
function output(object) {
	ShellUtils.output(object);
}

/**
 * Write to standard output if debug is enabled
 * 
 * @usage	debugOutput(object)
 * @param	{Object}	object	thing to write (e.g. a string or array)
 * @see		show		to display complex objects
 */
function debugOutput(object) {
	if (debug) {
		ShellUtils.output(object);
	}
}

/**
 * Display all properties/functions of an object (note: not recursive)
 * 
 * @usage	show(object)
 * @param	{Object}	object	object to display
 * @see		output		to print simple objects
 */
function show(object) {
	print( object );
	for( prop in object ) {
		print( prop + " : " + object[prop] );
	}
}


