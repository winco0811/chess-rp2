<?php

// Klasa koja predstavlja predložak za view.
class Template 
{
	private $registry;

	private $vars = array();

	function __construct( $registry ) 
	{
		$this->registry = $registry;
	}

	public function __set($index, $value)
	{
	    $this->vars[$index] = $value;
	}


	// Funkcija koja efektivno prikazuje view imena $name
	function show( $name ) 
	{
		$path = __SITE_PATH . '/view' . '/' . $name . '.php';

		if( file_exists($path) === false )
		{
			throw new Exception( 'Template not found in ' . $path );
			return false;
		}

		foreach( $this->vars as $key => $value )
		{
			$$key = $value;
		}

		require ($path); 
	}
}

?>
